import { v } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

export const archive = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated.");
    }

    const userId = identity.subject;

    const unarchivedDocument = await ctx.db.get(args.id);

    if (unarchivedDocument?.userId !== userId) {
      throw new Error("User is not authorized to archive this document.");
    }

    // Function to archive children;
    const recursiveArchive = async (documentId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId),
        )
        .collect();

      // Iterating through every child of the document and setting isArchive to true;
      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: true,
        });
      }
    };

    const document = await ctx.db.patch(args.id, {
      isArchived: true,
    });

    recursiveArchive(args.id);

    return document;
  },
});

export const getDocuments = query({
  args: {
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated.");
    }

    const userId = identity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentDocument", args.parentDocument),
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});

export const get = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated.");
    }

    const documents = await ctx.db.query("documents").collect();

    return documents;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated.");
    }

    const userId = identity.subject;

    const document = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
    });

    return document;
  },
});

export const getArchieved = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated.");
    }

    const userId = identity.subject;

    const archivedDocuments = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();

    return archivedDocuments;
  },
});

export const restore = mutation({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated.");
    }

    const userId = identity.subject;

    const archivedDocument = await ctx.db.get(args.documentId);

    if (!archivedDocument) {
      throw new Error("Document not found.");
    }

    if (archivedDocument?.userId !== userId) {
      throw new Error("You are not authorized to restore this document.");
    }

    const recursiveRestore = async (documentId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId),
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: false,
        });

        await recursiveRestore(child._id);
      }
    };

    const options: Partial<Doc<"documents">> = {
      isArchived: false,
    };

    if (archivedDocument.parentDocument) {
      const parent = await ctx.db.get(archivedDocument.parentDocument);

      if (parent?.isArchived) {
        options.parentDocument = undefined;
      }
    }

    const restoredDocument = await ctx.db.patch(args.documentId, options);

    recursiveRestore(args.documentId);

    return restoredDocument;
  },
});

export const remove = mutation({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated.");
    }

    const userId = identity.subject;

    const documentToRemove = await ctx.db.get(args.documentId);

    if (!documentToRemove) {
      throw new Error("Document not found.");
    }

    if (documentToRemove?.userId !== userId) {
      throw new Error("User is not authorized to delete this document.");
    }

    const deletedDoc = await ctx.db.delete(args.documentId);

    return deletedDoc;
  },
});

export const getAllDocuments = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated.");
    }

    const userId = identity.subject;

    const allDocuments = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return allDocuments;
  },
});

export const removeAllDocuments = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User is not authenticated.");
    }

    const userId = identity.subject;

    const allDocuments = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    allDocuments.forEach(async (document) => {
      await ctx.db.delete(document._id);
    });
  },
});

export const getDocumentById = query({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const document = await ctx.db.get(args.documentId);

    if (!document) {
      throw new Error("Document not found.");
    }

    /**
     * if the document is published and not archived
     * don't check anything &
     * return the document
     */
    if (document.isPublished && !document?.isArchived) {
      return document;
    }

    if (!identity) {
      throw new Error("User not authenticated.");
    }

    const userId = identity.subject;

    if (document.userId !== userId) {
      throw new Error("User not authorized.");
    }

    return document;
  },
});

export const update = mutation({
  args: {
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    id: v.id("documents"),
    isPublished: v.optional(v.boolean()),
    title: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated.");
    }

    const userId = identity.subject;

    const { id, ...rest } = args;
    const existingDocument = await ctx.db.get(id);

    if (!existingDocument) {
      throw new Error("Document not found.");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("User not authorized to edit this document.");
    }

    const document = await ctx.db.patch(id, {
      ...rest,
    });

    return document;
  },
});

export const removeIcon = mutation({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated.");
    }

    const userId = identity.subject;

    const document = await ctx.db.get(args.documentId);

    if (!document) {
      throw new Error("Document not found.");
    }

    if (document.userId !== userId) {
      throw new Error(
        "You are not authorized to change the icon of this document.",
      );
    }

    await ctx.db.patch(args.documentId, {
      icon: undefined,
    });
  },
});
