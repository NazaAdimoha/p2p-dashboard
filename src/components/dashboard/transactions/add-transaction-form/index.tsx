

// import { useIndustryStore } from '@/store/useIndustry';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { object, string, z } from 'zod';
import { Button } from '@/shared/button';
import { Textarea } from '@/shared/text-area';
import FieldInput from '@/shared/field-input';

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
//   defaultValues?: Partial<IndustryType>;
}

const Schema = object({
  amount: string().min(3, 'Name is required'),
  senderName: string().min(3, 'Description is required'),
});

type AddTransactionFormData = z.infer<typeof Schema>;

export default function AddTransaction({ setOpen }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTransactionFormData>({
    resolver: zodResolver(Schema),
  });

//   const { createIndustry, updateIndustry, loading, created } =
//     useIndustryStore();

  const onSubmit = (data: AddTransactionFormData) => {
    // if (defaultValues) {
    //   const payload = {
    //     ...data,
    //     id: String(defaultValues?.id),
    //   };
    //   updateIndustry(payload);
    // } else {
    //   createIndustry(data);
    // }

    console.log(data)
  };

//   useEffect(() => {
//     if (created) {
//       setOpen(false);
//     }
//   }, [created, setOpen]);

  return (
    <div className="px-10 w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-8">
          <h3 className="text-text-gray font-bold text-[32px]">
            Add Transaction
          </h3>
          <FieldInput
            label="Name this Industry Type"
            placeholder="Industry Type"
            {...register('amount')}
            errors={errors}
          />
          <Textarea
            placeholder="Brief description of the industry..."
            {...register('senderName')}
            errors={errors}
          />

          <hr className="mt-2 h-[1px]" />

          <div className="flex justify-end gap-3 -mt-4">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="ghost" type="submit" >
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
