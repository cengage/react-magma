import React from 'react';
import { Breadcrumb } from '.';
import { BreadcrumbItem } from './Item';

export default {
  component: Breadcrumb,
  title: 'Breadcrumb',
};

export const Default = () => {
  return (
    <Breadcrumb>
      <BreadcrumbItem to="#">Home</BreadcrumbItem>
      <BreadcrumbItem to="#">Library</BreadcrumbItem>
      <BreadcrumbItem>Data</BreadcrumbItem>
    </Breadcrumb>
  );
};
