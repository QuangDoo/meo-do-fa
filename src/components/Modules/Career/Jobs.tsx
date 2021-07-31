import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { TableHeader } from 'src/pages/loyalty-points';

import InputSearch from '../News/InputSearch';

type Props = {
  keySearch?: (x) => void;
  onSubmit?: () => void;
  jobs?: any;
};

function Jobs(props: Props) {
  const useStyles = makeStyles({
    table: {
      minWidth: 650
    }
  });
  const classes = useStyles();
  const { t } = useTranslation('career');

  const { jobs } = props;

  const [jobsData, setJobsData] = useState([]);

  useEffect(() => {
    setJobsData(jobs);
  }, [jobs]);

  const handleSearch = (x) => {
    if (!jobs) return;

    const jobSearchData = [...jobs]?.filter((item) => {
      return item.name.toLowerCase().includes(x.toLowerCase());
    });
    setJobsData(jobSearchData);
  };
  console.log(`jobs`, jobs);
  return (
    <>
      <div className="container mt-3">
        <h4 className="about-us__title text-center">{`${t('career:job_title')}`}</h4>
        <div className="row">
          <div className="col-12">
            <div className="mb-3 mt-3">
              <InputSearch placeholder="Search..." keySearch={(x) => handleSearch(x)} />
            </div>
          </div>
        </div>
        <TableContainer component={Paper}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>{t('career:position')}</TableHeader>

                  {/* <TableHeader>{t('career:type')}</TableHeader> */}

                  <TableHeader>{t('career:location')}</TableHeader>

                  {/* <TableHeader>{t('end_apply_date')}</TableHeader> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {jobsData?.map((job) => (
                  // <a key={job.name}>
                  <Link href={`/career/${job?.slug}`} key={job.name}>
                    <TableRow>
                      <TableCell component="th" scope="job">
                        {job.name}
                      </TableCell>
                      {/* <TableCell>{job.signature}</TableCell> */}
                      <TableCell>HCM City</TableCell>
                      {/* <TableCell>{job.create_date}</TableCell> */}
                    </TableRow>
                  </Link>
                  // </a>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TableContainer>
      </div>
    </>
  );
}

export default Jobs;
