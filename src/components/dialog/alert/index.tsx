'use client';

import PlainButton from '@/components/buttons/plain';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';

interface AlertDialogData {
  open: boolean;
  title: string;
  body: string;
  onAccept: () => void | Promise<void>;
  onReject?: () => void | Promise<void>;
}

const initialAlertDialogData = {
  open: false,
  title: '',
  body: '',
  onAccept: () => {},
  onReject: () => {},
};

const store$ = new BehaviorSubject<AlertDialogData>(initialAlertDialogData);

export const openAlertDialog = (data: Omit<AlertDialogData, 'open'>) =>
  store$.next({
    open: true,
    ...data,
  });

export const closeAlertDialog = () => store$.next(initialAlertDialogData);

const AlertDialog: React.FC = () => {
  const [data, setData] = useState<AlertDialogData>();
  useEffect(() => {
    const { unsubscribe } = store$.asObservable().subscribe({
      next: (data) => {
        setData(data);
      },
    });
    return () => unsubscribe();
  }, []);

  return (
    <Dialog
      open={data?.open ?? false}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ paper: 'bg-gray-300' }}
      fullWidth
      maxWidth={'sm'}
    >
      <DialogTitle id="alert-dialog-title">{data?.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {data?.body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <PlainButton
          label="Cancel"
          onClick={async () => {
            try {
              await data?.onReject?.();
            } finally {
              closeAlertDialog();
            }
          }}
        />
        <PlainButton
          label="Ok"
          onClick={async () => {
            try {
              await data?.onAccept();
            } finally {
              closeAlertDialog();
            }
          }}
        />
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
