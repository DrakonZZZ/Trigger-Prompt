import React from 'react';
import { ErrorPage } from '@/components';

const notFound = () => {
  return <ErrorPage code="404" message="Page not found" />;
};

export default notFound;
