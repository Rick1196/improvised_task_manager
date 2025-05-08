import { Button, Input, TagsInput, Textarea } from "@mantine/core";
import { SubmitHandler, useForm } from "react-hook-form";
import classes from "./form.module.css";
export type TicketI = {
  title: string;
  description: string;
  storyPoints: number;
  acceptanceCriteria: string;
  tags: string[];
  id: number;
  status_id: number;
};
type TicketFormI = {
  onSubmit: (ticketData: TicketI) => void;
  initialValue?: TicketI;
  actionText?: string;
  readonly?: boolean;
};

const TicketForm: React.FC<TicketFormI> = ({
  onSubmit,
  initialValue,
  actionText = "Submit",
  readonly = false,
}) => {
  console.log(initialValue);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<TicketI>({ defaultValues: initialValue });
  const handleOnSubmit: SubmitHandler<TicketI> = (data) => onSubmit(data);

  return (
    <form className={classes.form} onSubmit={handleSubmit(handleOnSubmit)}>
      <div>
        <label htmlFor="title">Title</label>
        <Input
          id="title"
          {...register("title", { required: true, disabled: readonly })}
          aria-describedby="error_title"
        />
        {errors.title?.message && (
          <span id="error_title" className={classes.error}>
            {errors.title.message}
          </span>
        )}
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <Textarea
          id="description"
          {...register("description", { required: true, disabled: readonly })}
          aria-describedby="error_description"
        />
        {errors.description?.message && (
          <span id="error_description" className={classes.error}>
            {errors.description.message}
          </span>
        )}
      </div>
      <div>
        <label htmlFor="acceptanceCriteria">Acceptance Criteria</label>
        <Textarea
          id="acceptanceCriteria"
          {...register("acceptanceCriteria", {
            required: true,
            disabled: readonly,
          })}
          aria-describedby="error_acceptanceCriteria"
        />
        {errors.acceptanceCriteria?.message && (
          <span id="error_acceptanceCriteria" className={classes.error}>
            {errors.acceptanceCriteria.message}
          </span>
        )}
      </div>
      <div>
        <label htmlFor="storyPoints">Story points</label>
        <Input
          id="storyPoints"
          type="number"
          {...register("storyPoints", {
            required: true,
            pattern: /^[1-9]+$/i,
            max: 5,
            disabled: readonly,
          })}
          error={errors.storyPoints?.message}
          aria-describedby="error_storyPoints"
        />
        {errors.storyPoints?.message && (
          <span id="error_storyPoints" className={classes.error}>
            {errors.storyPoints.message}
          </span>
        )}
      </div>
      {!readonly && <Button type="submit">{actionText}</Button>}
    </form>
  );
};
export default TicketForm;
