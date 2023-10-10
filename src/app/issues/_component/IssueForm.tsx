'use client';
import { ErrorMessage, Spinner } from '@/components';
import { issueSchema } from '@/zodSchemas/issueSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Callout,
  Flex,
  Select,
  TextField,
} from '@radix-ui/themes';
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
    console.log('status = ', data.status);
    try {
      setLoading(true);
      if (issue)
        await axios.put(`/api/issues/${issue.id}`, {
          title: data.title,
          description: data.description,
          status: data.status,
        });
      else
        await axios.post('/api/issues', {
          title: data.title,
          description: data.description,
        });
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
        <Flex gap="2" align="center">
          <TextField.Root className="flex-1">
            <TextField.Input
              defaultValue={issue?.title}
              {...register('title')}
              placeholder="Title"
            />
          </TextField.Root>
          <>
            {issue && (
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select.Root
                    onValueChange={field.onChange}
                    {...field}
                    defaultValue={issue.status}
                  >
                    <Select.Trigger />
                    <Select.Content position="popper">
                      <Select.Item value="OPEN">Open</Select.Item>
                      <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
                      <Select.Item value="CLOSED">Closed</Select.Item>
                    </Select.Content>
                  </Select.Root>
                )}
              />
            )}
          </>
        </Flex>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={issue ? issue.description : ''}
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
          {issue ? 'Update Issue' : 'Submit New Issue'} {loading && <Spinner />}
        </Button>
      </form>
    </div>
  );
}

export default IssueForm;
