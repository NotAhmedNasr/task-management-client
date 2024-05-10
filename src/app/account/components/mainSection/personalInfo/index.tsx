import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { selectToken, selectUser } from '@/lib/store/user/selectors';
import React from 'react';
import EditableField from './EditableField';
import { updateUser } from '@/lib/services/user.api';
import { AppUser } from '@/lib/store/user/types';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import {
  pickFromYupObjectSchema,
  registrationSchema,
} from '@/lib/schema/register';
import { setUser } from '@/lib/store/user/actions';

const PersonalInfo: React.FC = () => {
  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();
  if (!user || !token) return null;

  const onSave = async (id: keyof AppUser, value: string) => {
    try {
      const { data: updatedUser } = await updateUser({
        token,
        data: {
          [id]: value,
        },
      });
      dispatch(setUser(updatedUser));
    } catch (error) {
      let errMessage = '';
      if (error instanceof AxiosError) {
        errMessage = error.response?.data.message?.toString?.();
      } else if (error instanceof Error) {
        errMessage = error.message ?? 'Error!';
      }
      toast.error(errMessage);
    }
  };

  return (
    <div className="grid grid-col-1 xl:grid-cols-2 gap-5 overflow-auto">
      <EditableField
        id="username"
        label="Username"
        fieldValue={user?.username ?? ''}
        disabled
      />
      <EditableField
        id="email"
        label="Email"
        fieldValue={user?.email ?? ''}
        disabled
      />
      <EditableField
        id="firstName"
        label="First Name"
        fieldValue={user?.firstName ?? ''}
        schema={pickFromYupObjectSchema(registrationSchema, ['firstName'])}
        onSave={onSave}
      />
      <EditableField
        id="lastName"
        label="Last Name"
        fieldValue={user?.lastName ?? ''}
        schema={pickFromYupObjectSchema(registrationSchema, ['lastName'])}
        onSave={onSave}
      />
    </div>
  );
};

export default PersonalInfo;
