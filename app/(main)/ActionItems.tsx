import useCreateDocument from "@/hooks/useCreateDocument";
import useSearch from "@/hooks/useSearch";
import useSettings from "@/hooks/useSettings";
import { PlusCircle, Search, Settings } from "lucide-react";
import Item from "./Item";
import UserItem from "./UserItem";

const ActionItems = () => {
  const search = useSearch();
  const settings = useSettings();

  const handleCreate = useCreateDocument();

  return (
    <div>
      <UserItem />
      <Item icon={Settings} label="Settings" onClick={settings.handleOpen} />
      <Item isSearch icon={Search} label="Search" onClick={search.handleOpen} />
      <Item icon={PlusCircle} label="New Page" onClick={handleCreate} />
    </div>
  );
};

export default ActionItems;
