import Select, { ActionMeta, SingleValue } from "react-select";
import { DirectionOption, FieldOption } from "./types/user";

export type ControlsProps = {
  sortField: FieldOption;
  sortDirection: DirectionOption;
  handleChangeField: (newValue: SingleValue<FieldOption>, actionMeta: ActionMeta<FieldOption>) => void;
  handleChangeDirection: (newValue: SingleValue<DirectionOption>, actionMeta: ActionMeta<DirectionOption>) => void;
};

const Controls = ({ sortField, sortDirection, handleChangeField, handleChangeDirection }: ControlsProps) => {
  const fieldOptions: FieldOption[] = [
    { label: "Name", value: "name" },
    { label: "Company", value: "company.name" },
    { label: "Email", value: "email" },
  ];
  const directionOptions: DirectionOption[] = [
    { label: "Ascending", value: "ascending" },
    { label: "Descending", value: "descending" },
  ];

  return (
    <div className="gallery-controls controls">
      <div className="form-group group">
        <label htmlFor="sort-field" className="label">
          Sort Field
        </label>
        <Select options={fieldOptions} inputId="sort-field" className="input" value={sortField} onChange={handleChangeField} />
      </div>
      <div className="form-group group">
        <label htmlFor="sort-direction" className="label">
          Sort Direction
        </label>
        <Select
          options={directionOptions}
          inputId="sort-direction"
          className="input"
          value={sortDirection}
          onChange={handleChangeDirection}
        />
      </div>
    </div>
  );
};

export default Controls;
