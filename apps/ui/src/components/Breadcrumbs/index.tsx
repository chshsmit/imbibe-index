import React, { PropsWithChildren } from "react";

interface BreadcrumbsProps {
  className?: string;
  separator?: string | JSX.Element;
}

export default function Breadcrumbs({
  className,
  separator = "/",
  children,
}: PropsWithChildren<BreadcrumbsProps>): JSX.Element {
  return (
    <div className={`p-2 ${className}`}>
      <ol className="list-none p-0 inline-flex">
        {React.Children.map(children, (item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <p className="ml-2 mr-2">{separator}</p>}
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
