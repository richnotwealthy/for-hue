import {socket} from './listeners';

export const uploadPDF = (pdf, forType) => {
  socket.emit('pdf-upload', pdf, forType);
}