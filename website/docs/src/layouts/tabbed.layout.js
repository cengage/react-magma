import React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx"
import {
  Heading,
  TabsContainer,
  Tabs,
  Tab,
  TabPanelsContainer,
  TabPanel,
} from '@react-magma/dom';

const DocLayout = (({tabs, section}) => {
  return (
    <TabsContainer>
      <div>
        <Heading level={1}>{section}</Heading>
        <Tabs aria-label="Sample Tabs">
          {Object.keys(tabs).map(tab => (
            <Tab>{tab}</Tab>
          ))}
        </Tabs>
      </div>
      <div>
        <TabPanelsContainer>
          {Object.keys(tabs).map(tab => (
            <TabPanel>
              <MDXRenderer>{tabs[tab].body}</MDXRenderer>
              <ul>
                {tabs[tab] &&
                  tabs[tab].tableOfContents &&
                  tabs[tab].tableOfContents.items && tabs[
                    tab
                  ].tableOfContents.items.map(section => (
                    <li>
                      <a href={section.url}>{section.title}</a>
                    </li>
                  ))}
              </ul>
            </TabPanel>
          ))}
        </TabPanelsContainer>
      </div>
    </TabsContainer>
  );
})

export default DocLayout;