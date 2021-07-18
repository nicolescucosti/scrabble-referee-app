import { ReactNode, useEffect, useMemo } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Portal } from 'react-portal';

import { noop } from 'lib';

const canUseDom = typeof window !== 'undefined' && window.document && window.document.createElement;

const usePortal = (children: ReactNode): void => {
  const element = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    document.body.appendChild(element);

    return () => {
      unmountComponentAtNode(element);
      document.body.removeChild(element);
    };
  }, [element]);

  useEffect(() => {
    render(<Portal>{children}</Portal>, element);
  }, [children, element]);
};

export default canUseDom ? usePortal : noop;
