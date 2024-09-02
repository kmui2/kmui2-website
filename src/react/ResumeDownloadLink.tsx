/* eslint-disable solid/no-react-specific-props */

import { PDFDownloadLink } from '@react-pdf/renderer';
import type { FunctionComponent } from 'react';
import ResumeDocument from '~/react/ResumeDocument';
import { DownloadIcon } from 'lucide-react';
import { button } from '~/styled-system/recipes';

const ResumeDownloadLink: FunctionComponent = () => {
  return (
    <PDFDownloadLink document={<ResumeDocument />} fileName="KevinMui_Resume.pdf">
      <button className={button({ variant: 'solid' })}>
        <DownloadIcon />
        Download
      </button>
    </PDFDownloadLink>
  );
};

export default ResumeDownloadLink;
