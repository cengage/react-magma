import React from 'react';
import { Breadcrumb, BreadcrumbItem } from '.';

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
