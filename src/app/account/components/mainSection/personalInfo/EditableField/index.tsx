import XButton from '@/components/buttons/x';
import { openAlertDialog } from '@/components/dialog/alert';
import SingleFieldForm from '@/components/forms/singleField';
import { AppUser } from '@/lib/store/user/types';
import React, { useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';

interface Props {
  id: keyof AppUser;
  label: string;
  disabled?: true;
  validate?: () => void;
  schema?: object;
  onSave?: (id: keyof AppUser, value: string) => Promise<void>;
  fieldValue: string;
}

const EditableField: React.FC<Props> = ({
  id,
  label,
  fieldValue,
  validate,
  schema,
  onSave = () => {},
  disabled,
}) => {
  const [editing, setEditing] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-3 items-start">
      <p className="text-gray-100 font-medium p-2">{label}</p>
      {editing ? (
        <div className="flex flex-col items-center sm:flex-row gap-2 ">
          <SingleFieldForm
            name={id}
            initialValue={fieldValue ?? ''}
            validate={validate}
            fieldSchema={schema}
            onSave={async (value) => {
              openAlertDialog({
                title: 'Are you sure?',
                body: '',
                onAccept: async () => {
                  await onSave(id, value);
                  setEditing(false);
                },
              });
            }}
            fieldClassName="grow bg-gray-800 focus:outline-none p-2 rounded-sm"
            getButtonClassName={(disabled) =>
              `${
                disabled
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-cyan-900 hover:bg-cyan-800'
              } text-white px-3 py-2 rounded-sm transition duration-200`
            }
          />
          <XButton onClick={() => setEditing(false)} size={30} />
        </div>
      ) : (
        <div className="flex justify-between">
          <p className="text-gray-400 p-2">{fieldValue}</p>
          <button
            hidden={!!disabled}
            className="p-2"
            onClick={() => setEditing(true)}
          >
            <FiEdit2 />
          </button>
        </div>
      )}
    </div>
  );
};

export default EditableField;
