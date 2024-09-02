/* eslint-disable solid/prefer-for */
/* eslint-disable solid/style-prop */
/* eslint-disable solid/no-destructure */
import { Document, Font, Link, PDFViewer, Page, Text, View } from '@react-pdf/renderer';
import { CircleDot, MailIcon, Phone, Globe } from 'lucide-react';
import { SiGithub, SiLinkedin, SiStackoverflow } from '@icons-pack/react-simple-icons';
import type { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import ReactPdfSvg from './ReactPdfSvg';
import content from './content.yaml';

import TinosRegular from '~/fonts/Tinos/Tinos-Regular.ttf';
import TinosItalic from '~/fonts/Tinos/Tinos-Italic.ttf';
import TinosBold from '~/fonts/Tinos/Tinos-Bold.ttf';
import TinosBoldItalic from '~/fonts/Tinos/Tinos-BoldItalic.ttf';

Font.register({
  family: 'Tinos',
  fonts: [
    { src: TinosRegular },
    { src: TinosItalic, fontStyle: 'italic' },
    { src: TinosBold, fontWeight: 'bold' },
    { src: TinosBoldItalic, fontWeight: 'bold', fontStyle: 'italic' },
  ],
});

const Heading1: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', gap: 5 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{children}</Text>
      <View style={{ borderBottom: 1, flexGrow: 1 }} />
    </View>
  );
};

const Heading2: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{children}</Text>;
};

const Heading3: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <Text style={{ fontSize: 11, fontStyle: 'italic' }}>{children}</Text>;
};

const Section: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <View
      style={{
        gap: 5,
        width: '100%',
      }}
    >
      {children}
    </View>
  );
};

const Handle: FunctionComponent<PropsWithChildren<{ src?: string; icon: ReactNode }>> = ({
  children,
  src,
  icon,
}) => {
  return (
    <View style={{ fontSize: 10, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
      <View style={{}}>
        <ReactPdfSvg>{icon}</ReactPdfSvg>
      </View>

      <Link src={src}>{children}</Link>
    </View>
  );
};

const BulletPoint: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ width: '4%', paddingTop: 5 }}>
        <ReactPdfSvg>
          <CircleDot size={4} />
        </ReactPdfSvg>
      </View>
      <View style={{ width: '100%' }}>{children}</View>
    </View>
  );
};

const Header: FunctionComponent<{
  name: string;
  role: string;
  period: string;
  location: string;
}> = ({ name, role, period, location }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'column' }}>
        <Heading2>{name}</Heading2>
        <Heading3>{role}</Heading3>
      </View>
      <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
        <Heading2>{location}</Heading2>
        <Heading3>{period}</Heading3>
      </View>
    </View>
  );
};

export const MyDocument = () => {
  return (
    <Document title="Kevin_Mui_Resume">
      <Page
        size="A4"
        style={{
          flexDirection: 'column',
          gap: 10,
          backgroundColor: 'white',
          fontFamily: 'Tinos',
          alignItems: 'center',
          padding: 30,
        }}
      >
        <View style={{ fontSize: 35 }}>
          <Text style={{ fontWeight: 'bold' }}>KEVIN MUI</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            flexWrap: 'wrap',
          }}
        >
          <Handle
            src="mailto:kevinmui1997@yahoo.com"
            icon={<MailIcon color="white" fill="black" size={15} />}
          >
            <Text>kevinmui1997@yahoo.com</Text>
          </Handle>

          <Handle
            src="https://stackoverflow.com/users/8109319/kmui2"
            icon={<SiStackoverflow fill="black" size={10} />}
          >
            <Text>@kmui2</Text>
          </Handle>

          <Handle
            src="https://www.linkedin.com/in/kmui2/"
            icon={<SiLinkedin fill="black" size={10} />}
          >
            <Text>@kmui2</Text>
          </Handle>

          <Handle
            src="https://github.com/kmui2/"
            icon={<SiGithub fill="black" color="black" size={10} />}
          >
            <Text>@kmui2</Text>
          </Handle>

          <Handle
            src="https://kmui2.netlify.app/"
            icon={<Globe size={10} color="black" fill="white" />}
          >
            <Text>kmui2.netlify.app</Text>
          </Handle>

          <Handle src="tel:920-750-2164" icon={<Phone fill="green" size={10} />}>
            <Text>(920) 750-2164</Text>
          </Handle>
        </View>
        <Section>
          <Heading1>EDUCATION</Heading1>
          <Header
            name="University of Wisconsin-Madison | 3.75/4.0 GPA"
            role="B.S. Computer Science & Computer Engineering | Graduated with Distinction"
            period="Sept 2015 - May 2019"
            location="Madison, WI"
          />
        </Section>
        <Section>
          <Heading1>EXPERIENCE</Heading1>
          {content.experience.map((exp) => (
            <View key={exp.company} style={{ marginBottom: 10 }}>
              <Header
                name={exp.company}
                role={exp.title}
                period={exp.period}
                location={exp.location}
              />
              <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                {exp.points.map((point, i) => (
                  <BulletPoint key={i}>
                    <Text style={{ fontSize: 12 }}>{point}</Text>
                  </BulletPoint>
                ))}
              </View>
            </View>
          ))}
        </Section>
        <Section>
          <Heading1>SKILLS</Heading1>
          {content.techStack && (
            <BulletPoint>
              <View>
                <View style={{ fontWeight: 'bold' }}>
                  <Text
                    style={{
                      // React PDF has a bug where bold is applied to the whole text
                      fontSize: 12,
                      fontWeight: 'bold',
                      textDecoration: 'underline',
                    }}
                  >
                    Tech Stack:
                  </Text>
                </View>
                <Text style={{ fontSize: 12 }}>{content.techStack}</Text>
              </View>
            </BulletPoint>
          )}
          <BulletPoint>
            <View>
              <View style={{ fontWeight: 'bold' }}>
                <Text
                  style={{
                    // React PDF has a bug where bold is applied to the whole text
                    fontSize: 12,
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                  }}
                >
                  Skills:
                </Text>
              </View>
              <Text style={{ fontSize: 12 }}>{content.skills}</Text>
            </View>
          </BulletPoint>
        </Section>
      </Page>
    </Document>
  );
};

function App() {
  return (
    <PDFViewer
      style={{ width: '100%', height: '100%', margin: 0, objectFit: 'contain', border: 0 }}
    >
      <MyDocument />
    </PDFViewer>
  );
}

export default App;
