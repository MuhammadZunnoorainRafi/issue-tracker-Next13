'use client';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Skeleton from '@/components/Skeleton';
import { Toaster, toast } from 'sonner';

function AssigneeSelect({ issue }: { issue: Issue }) {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton height="1.4rem" />;

  if (error) return null;

  const assignUserFunction = async (userId: string) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId === '-' ? null : userId,
      });
    } catch (error) {
      toast.error('Changes not be saved.');
    }
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <Select.Root
        defaultValue={issue.assignedToUserId || '-'}
        onValueChange={assignUserFunction}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="-">Unassigned</Select.Item>
            {users?.map((val) => (
              <Select.Item key={val.id} value={val.id}>
                {val.email}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
}

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => axios.get('/api/users').then((res) => res.data),
    staleTime: 3 * 60 * 1000,
    retry: 3,
  });

export default AssigneeSelect;
