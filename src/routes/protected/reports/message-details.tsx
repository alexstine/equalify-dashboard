import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Link, useParams } from 'react-router-dom';

import Timeline from '~/components/charts/timeline';
import { SEO } from '~/components/layout';
import { DataTable } from '~/components/tables';
import { Node } from '~/graphql/types';
import { reportDetailsQuery } from '~/queries/reports';

const MessageDetails = () => {
  const { reportId = '', messageId = '' } = useParams();
  const { data, error } = useMessageDetails(reportId, messageId);
  if (error) return <div role="alert">Error loading message details.</div>;

  const NodeColumns: ColumnDef<Node>[] = [
    {
      accessorKey: 'codeSnippet',
      header: 'Code Snippet',
      cell: ({ row }) => (
        <code>
          {row.getValue('codeSnippet')}
        </code>
      ),
    },
    {
      accessorKey: 'pageUrl',
      header: 'Page URL',
      cell: ({ row }) => (
        <Link
          to={`/reports/${reportId}/pages/${row.original.pageId}`}
          className="underline w-[25%]"
        >
          {row.getValue('pageUrl')}
        </Link>
      ),
    },
    { accessorKey: 'status', header: 'Status' },
  ];

  return (
    <div className="space-y-4">
      <SEO
        title={`${data?.messageName} - Message Details - Equalify`}
        description={`View the details of the ${data?.messageName} message, including associated nodes and pages, on Equalify.`}
        url={`https://www.equalify.dev/reports/${reportId}/messages/${messageId}`}
      />
      <div className="flex w-full flex-col-reverse justify-between sm:flex-row sm:items-center">
        <div>
          <Link to={`/reports/${reportId}`} className="hover:underline">
            <h1
              id="report-details-heading"
              className="text-2xl font-bold md:text-3xl"
            >
              {data?.reportName}
            </h1>
          </Link>
          <p className="text-lg text-gray-500">{data?.messageName}</p>
          {data?.moreInfoUrl && <a target='_blank' className='inline-flex h-9 items-center justify-end place-self-end whitespace-nowrap rounded-md bg-[#0d6efd] px-2 py-3 text-base text-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0d6efd] focus-visible:ring-offset-2 max-sm:w-fit max-sm:px-1 gap-2 hover:opacity-50' href={data.moreInfoUrl}>More Info<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"></path>
            <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"></path>
          </svg></a>}
        </div>
        <Link
          to={`/reports/${reportId}/edit`}
          className="inline-flex h-9 items-center justify-end place-self-end whitespace-nowrap  rounded-md bg-[#005031] px-4 py-3 text-base text-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1D781D] focus-visible:ring-offset-2 max-sm:w-fit max-sm:px-3 max-sm:py-2.5"
        >
          Edit Report
        </Link>
      </div>

      <div className="rounded-lg bg-white p-4 shadow md:p-8">
        <Timeline data={data?.chart} />
      </div>

      <div className="overflow-x-auto rounded-lg bg-white p-4 shadow">
        <DataTable
          columns={NodeColumns}
          data={data?.nodes ?? []}
          type="messages"
        />
      </div>
    </div>
  );
};

export default MessageDetails;
