import { Input, TagsInput, Textarea } from '@mantine/core';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

export type TicketI = {
  title: string;
  description: string;
  storyPoints: number;
  acceptanceCriteria: string;
  tags: string[];
  id: number;
  status_id: number;
}
type TicketFormI = {
  onSubmit: (ticketData: TicketI) => void;
  initialValue?: TicketI;
  actionText?: string
}
const TicketForm: React.FC<TicketFormI> = ({ onSubmit, initialValue, actionText = "Submit" }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<TicketI>({ defaultValues: initialValue })
  const handleOnSubmit: SubmitHandler<TicketI> = (data) => onSubmit(data);

  return <form onSubmit={handleSubmit(handleOnSubmit)}>
    <label>
      Title
      <Input {...register("title", { required: true })} />
    </label>
    <label>
      Description
      <Textarea {...register("description", { required: true })} />
    </label>
    <label>
      Acceptance Criteria
      <Textarea {...register("acceptanceCriteria", { required: true })} />
    </label>
    <label>
      Story points
      <Input type="number"  {...register("storyPoints", { required: true, pattern: /^[1-9]+$/i, max: 5 })} />
    </label>
    <Controller
      name='tags'
      control={control}
      rules={{
        required: true
      }}
      render={({ field: { onChange, value } }) => {
        return <label>
          Tags
          <TagsInput onChange={(tags) => onChange(tags)} value={value} />
        </label>

      }}

    />
    <button type='submit'>{actionText}</button>
  </form>
}
export default TicketForm;
