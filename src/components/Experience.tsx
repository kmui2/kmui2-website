import { Stack } from '~/styled-system/jsx';

import { FaBrandsJava } from 'solid-icons/fa';
import {
  SiApachecassandra,
  SiApachekafka,
  SiFlutter,
  SiGooglecloud,
  SiJavascript,
  SiOracle,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSpring,
  SiTypescript,
} from 'solid-icons/si';
import { TbSql } from 'solid-icons/tb';
import { type Component } from 'solid-js';
import ExperienceItem from './ExperienceItem';
import Section from './Section';

const Experience: Component = () => {
  return (
    <Section heading="Experience">
      <Stack gap={0}>
        <ExperienceItem
          title="Software Engineer III"
          company="CME Group"
          period="June 2019 - Present"
          location="Chicago, IL - Hybrid"
          description="Developed high-volume risk management apps in Java Spring and JavaScript for CME Clearing House and quants, focusing on margining, pricing, and asset type calculations."
          techStack={[
            { label: 'Java', icon: FaBrandsJava },
            { label: 'Spring', icon: SiSpring },
            { label: 'GCP', icon: SiGooglecloud },
            { label: 'Oracle', icon: SiOracle },
            { label: 'Cassandra', icon: SiApachecassandra },
            { label: 'Kafka', icon: SiApachekafka },
          ]}
        />
        <ExperienceItem
          title="Full Stack Engineer"
          company="DataChat.ai"
          period="Sept 2017 - Sept 2021"
          location="Madison, WI - Onsite (Part-time)"
          description="Architected and engineered a React web and mobile chat application, integrating natural language processing for intuitive data analysis."
          techStack={[
            { label: 'React', icon: SiReact },
            { label: 'JavaScript', icon: SiJavascript },
            { label: 'Python', icon: SiPython },
            { label: 'Postgres', icon: SiPostgresql },
          ]}
        />
        <ExperienceItem
          title="Full Stack Engineer"
          company="University of Wisconsin-Madison"
          period="Sept 2016 - Mar 2024"
          location="Madison, WI - Remote (Part-time)"
          description="Developed web and mobile psychology experiments, collecting millions of data points for publications."
          techStack={[
            { label: 'React', icon: SiReact },
            { label: 'TypeScript', icon: SiTypescript },
            { label: 'Python', icon: SiPython },
            { label: 'Flutter', icon: SiFlutter },
          ]}
        />
        <ExperienceItem
          title="Programmer Intern"
          company="Acuity Insurance"
          period="Jun 2018 - Aug 2018"
          location="Sheboygan, WI - Onsite (Internship)"
          description="Engineered a web app for customer data, improving page load by 70% compared to the legacy website."
          techStack={[
            { label: 'Java', icon: FaBrandsJava },
            { label: 'JavaScript', icon: SiJavascript },
            { label: 'SQL', icon: TbSql },
          ]}
        />
      </Stack>
    </Section>
  );
};

export default Experience;
