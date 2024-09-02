/* eslint-disable solid/style-prop */

import { PDFViewer } from '@react-pdf/renderer';
import ResumeDocument from '~/react/ResumeDocument';

const ResumeViewer = () => {
  return (
    <PDFViewer
      style={{ width: '100%', height: '100%', margin: 0, objectFit: 'contain', border: 0 }}
    >
      <ResumeDocument />
    </PDFViewer>
  );
};

export default ResumeViewer;
