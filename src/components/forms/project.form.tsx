import { Button, Input } from "@mantine/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, useFieldArray } from "react-hook-form";
import classes from "./form.module.css";
export type ProjectI = {
  id: number;
  title: string;
  description: string;
  statuses: string[];
};
type ProjectFormI = {
  initialValue?: ProjectI;
  onSubmit: (data: ProjectI) => void;
  actionText?: string;
};

const schema = yup
  .object()
  .shape({
    id: yup.number().required().default(0),
    title: yup.string().required("Project title is required."),
    description: yup.string().required("Project decription is required."),
    statuses: yup
      .array()
      .required()
      .min(2, "You need to add at least 2 ticket statuses")
      .max(8, "You can not add more than 8 statuses to your project.")
      .of(yup.string().required("Status name is required"))
      .test("unique", "Statuses must be unique", (value) => {
        if (!value) return true; // handled by required
        const unique = new Set(value);
        return unique.size === value.length;
      }),
  })
  .required();

const ProjectForm: React.FC<ProjectFormI> = ({
  initialValue,
  onSubmit,
  actionText = "Create Project",
}) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });
  const { append, remove, fields } = useFieldArray({
    control,
    name: "statuses",
  });
  console.log("debug", errors);

  const handleOnSubmit = (data: ProjectI) => onSubmit(data);
  return (
    <form className={classes.form} onSubmit={handleSubmit(handleOnSubmit)}>
      <div>
        <label htmlFor="title">Project Title</label>
        <Input
          {...register("title", { required: true, maxLength: 128 })}
          error={errors.title?.message}
          id="title"
          aria-errormessage={errors.title?.message}
          aria-describedby="title title-error"
        />
        {errors.title?.message && (
          <span id="title-error" className={classes.error}>
            {errors.title?.message}
          </span>
        )}
      </div>
      <div>
        <label htmlFor="description">Project Description</label>
        <Input
          {...register("description", { required: true })}
          id="description"
          error={errors.description?.message}
          aria-describedby="description description-error"
        />
        {errors.description?.message && (
          <span id="description-error" className={classes.error}>
            {errors.description.message}
          </span>
        )}
      </div>
      <div className={classes.statusesContainer}>
        <div className={classes.buttonContainer}>
          <p>Statuses</p>
          <Button size="sm" variant="outline" onClick={() => append("")}>
            Add new status
          </Button>
        </div>
        {fields.map((field, index) => (
          <div key={field.id}>
            <label htmlFor={`status_${index}`}>{`Status ${index + 1}`}</label>
            <Input
              id={`status_${index}`}
              {...register(`statuses.${index}`, {
                required: true,
                maxLength: 128,
              })}
              error={errors.statuses?.[index]?.message}
              aria-describedby={`status${index} statuses_error_${index}`}
            />
            {errors.statuses?.[index]?.message && (
              <span id={`statuses_error_${index}`} className={classes.error}>{errors.statuses?.[index].message}</span>
            )}
          </div>
        ))}
        {errors?.statuses?.message && (
          <span className={classes.error}>{errors.statuses?.message}</span>
        )}
      </div>
      <Button type="submit">{actionText}</Button>
    </form>
  );
};

export default ProjectForm;
