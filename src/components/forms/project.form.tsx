import { Box, Button, Container, Input } from "@mantine/core";
import { useForm, useFieldArray } from "react-hook-form";
import classes from "./form.module.css";
export type ProjectI = {
  id: string;
  title: string;
  description: string;
  statuses: string[];
};
type ProjectFormI = {
  initialValue?: ProjectI;
  onSubmit: (data: ProjectI) => void;
  actionText?: string;
};

const ProjectForm: React.FC<ProjectFormI> = ({
  initialValue,
  onSubmit,
  actionText = "Create Project",
}) => {
  const { handleSubmit, register, control } = useForm<ProjectI>({
    defaultValues: initialValue,
  });
  const { append, remove, fields } = useFieldArray({
    control,
    name: "statuses",
  });
  const handleOnSubmit = (data: ProjectI) => onSubmit(data);
  return (
    <form className={classes.form} onSubmit={handleSubmit(handleOnSubmit)}>
      <label>
        Project Title
        <Input {...register("title", { required: true, maxLength: 128 })} />
      </label>
      <label>
        Project Description
        <Input {...register("description", { required: true })} />
      </label>
      <div className={classes.statusesContainer}>
        <div className={classes.buttonContainer}>
          <p>Statuses</p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => append("")}
          >
            Add new status
          </Button>
        </div>
        {fields.map((field, index) => (
          <label key={field.id}>
            {`Status ${index + 1}`}
            <Input
              {...register(`statuses.${index}`, {
                required: true,
                maxLength: 128,
              })}
            />
          </label>
        ))}
      </div>
      <Button type="submit">{actionText}</Button>
    </form>
  );
};

export default ProjectForm;
