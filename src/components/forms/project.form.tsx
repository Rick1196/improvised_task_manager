import { Button, Input } from "@mantine/core";
import { useForm } from "react-hook-form";
import classes from "./form.module.css";
export type ProjectI = {
  id: string;
  title: string;
  description: string;
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
  const { handleSubmit, register } = useForm<ProjectI>({
    defaultValues: initialValue,
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
      <Button type="submit">{actionText}</Button>
    </form>
  );
};

export default ProjectForm;

