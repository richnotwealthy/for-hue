import {socket} from './listeners';

export const uploadPDF = (pdf) => {
  socket.emit('pdf-upload', pdf);
}