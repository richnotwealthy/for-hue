import io from 'socket.io-client';
export const socket = io.connect('/');

export const pdfDaltonized = (cb) => {
  socket.on('pdf-daltonized', cb);
}