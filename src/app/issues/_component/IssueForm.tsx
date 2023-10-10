'use client';
import { ErrorMessage, Spinner } from '@/components';
import { issueSchema } from '@/zodSchemas/issueSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import 'easymde/dist/easymde.min.css';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Issue } from '@prisma/client';
import SimpleMDE from 'react-simplemde-editor';

type IssueFormData = z.infer<typeof issueSchema>;
function IssueForm({ issue }: { issue?: Issue }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const formSubmit = async (data: IssueFormData) => {
    try {
      setLoading(true);
      await axios.post('/api/issues', data);
      router.push('/issues');
      router.refresh();
    } catch (error) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" mb="4">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form onSubmit={handleSubmit(formSubmit)} className="space-y-3">
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            {...register('title')}
            placeholder="Title"
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE
              defaultValue={issue?.description}
              {...field}
              placeholder="Description"
            />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={loading}>
          Submit New Issue {loading && <Spinner />}
        </Button>
      </form>
    </div>
  );
}

export default IssueForm;
