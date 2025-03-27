import { TagsInput } from '@mantine/core';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
export type TicketI = {
    title: string;
    description: string;
    storyPoints: number;
    acceptanceCriteria: string;
    tags: string[];
    id: string;
    status_id:number;
}
type TicketFormI = {
    onSubmit: () => void;
    initialValue?: TicketI;
    actionText?: string
}
const TicketForm: React.FC<TicketFormI> = ({ onSubmit, initialValue, actionText = "Submit" }) => {]

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<TicketI>({ defaultValues: initialValue })
    const handleOnSubmit: SubmitHandler<TicketI> = (data) => console.log(data)

    return <form onSubmit={handleSubmit(handleOnSubmit)}>
        <label>
            Title
            <input {...register("title", { required: true })} />
        </label>
        <label>
            Description
            <input {...register("description", { required: true })} />
        </label>
        <label>
            Acceptance Criteria
            <input {...register("acceptanceCriteria", { required: true })} />
        </label>
        <label>
            Story points
            <input type="number"  {...register("storyPoints", { required: true, pattern: /^[1-9]+$/i, max: 5 })} />
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
