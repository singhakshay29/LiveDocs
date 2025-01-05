import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UserTypeSelector = ({
  userType,
  setUserType,
}: UserTypeSelectorParams) => {
  const accessChangeHandle = (type: UserType) => {
    setUserType(type);
    // onClickHandler && onClickHandle(type);
  };
  return (
    <Select
      value={userType}
      onValueChange={(type: UserType) => {
        accessChangeHandle(type);
      }}>
      <SelectTrigger className="shad-select">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="border-none bg-dark-200">
        <SelectItem value="viewer" className="shad-select-item">
          can view
        </SelectItem>
        <SelectItem value="editor" className="shad-select-item">
          can edit
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default UserTypeSelector;
