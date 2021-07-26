import { useQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from 'src/components/Form/Button';
import Input from 'src/components/Form/Input';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import {
  GET_POST_DETAIL,
  GetWebsitePostData,
  GetWebsitePostVariables
} from 'src/graphql/news/getWebsitePostDetail';
import redirect from 'src/utils/redirect';
import withToken from 'src/utils/withToken';
import styled from 'styled-components';

import Head from '../../components/Layout/Head';
import JobDetail from '../../components/Modules/Career/JobDetail';

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return '#eeeeee';
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const job = {
  name: 'Tax Accountant',
  department: 'People, Legal and Finance',
  level: 'Experienced',
  location: 'Việt Nam - TP. Hồ Chí Minh',
  description: `Bộ phận Nhân lực, Pháp lý, Tài chính đóng vai trò thiết yếu tại Shopee. 
  Họ chịu trách nhiệm về nhu cầu nguồn nhân lực cho mọi phòng ban và hỗ trợ mọi thủ tục về hành chính, 
  pháp lý để vận hành doanh nghiệp. Vì yếu tố con người là trọng tâm phát triển của Shopee, 
  nên những bộ phận này đang không ngừng cải thiện và nâng cao khả năng hỗ trợ để đưa Shopee lên một 
  tầm cao hơn.`,
  jobDescription: [
    'Main in-charge for preparation of tax returns, including corporate Income Tax, Value Added Tax, Foreign Contractor Withholding Tax, and Transfer pricing documentation',
    `Assist line manager carry out tax projects to improve tax compliance, reduce tax risk and substance tax position`,
    `Timely provides supports on finance events as final statutory audit, tax audit or any other activities that not anticipated`,
    `Support on preparing tax corespondence and related documents to tax or related authorities in case seeking advices or appealing, where required`,
    `Review all kind of contract & relevant supporting documents from tax perspective to ensure compliance with both internal & external policies`,
    `Review all kind of promotion registration form and tracking the promotion compliance from tax perspective`,
    `Timely address tax concerns of other business team, where required`,
    `Keeps up to date with changing tax laws, analyses the implication and timely consult to management`,
    `Other tasks assigned by manager`
  ],
  requirements: [
    `3+ years of experience in Big4 or other professional firm`,
    `In-house tax experience is a plus`,
    `Bachelor Degree majoring in Accounting, Finance, Economics, etc`,
    `Fluent in English writing and speaking`,
    `Eager-to-learn attitude and ability to work under pressure`
  ]
};

function getPostId(slug: string): number {
  return +slug.split('-').pop().replace('nid', '');
}

function CareerPage() {
  const { t, i18n } = useTranslation(['common', 'career']);
  const router = useRouter();

  const { data: hrDetailData } = useQuery<GetWebsitePostData, GetWebsitePostVariables>(
    GET_POST_DETAIL,
    {
      variables: { id: getPostId(router.query.jobId as string) }
    }
  );
  const { name, content, create_date, signature, content_en } =
    hrDetailData?.getWebsitePostDetail || {};

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles
  } = useDropzone();

  const files = acceptedFiles.map((file) => <li key={file.name}>{file.name}</li>);

  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>
      <div className="container">
        {hrDetailData ? (
          i18n?.language === 'vi' ? (
            <div
              dangerouslySetInnerHTML={{
                __html: content + ''
              }}
            />
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: content_en + ''
              }}
            />
          )
        ) : (
          <div className="d-flex justify-content-center align-items-center p-5">
            {t('common:updating')}
          </div>
        )}
      </div>

      <div className="container">
        <h1 className="text-center">Nộp hồ sơ</h1>
        <div className="row">
          <div className="col-6">
            <Input
              name="candidateName"
              containerClass="mb-4"
              iconClass="icomoon icon-user"
              placeholder="Họ và tên"
              required
            />
            <Input
              name="phone"
              containerClass="mb-4"
              iconClass="icomoon icon-phone"
              placeholder="Số điện thoại"
              required
            />
            <Input
              name="phone"
              containerClass="mb-4"
              iconClass="icomoon icon-mail"
              placeholder="Email"
              required
            />
          </div>
          <div className="col-6">
            <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
              <input {...getInputProps()} />
              <p>Drag drop some files here, or click to select files</p>
              {files}
            </Container>
          </div>
        </div>
        <div className="text-center mb-4">
          <Button type="submit" variant="gradient">
            {t('apply')}
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}

CareerPage.getInitialProps = async (ctx) => {
  // redirect({
  //   ctx,
  //   location: '/'
  // });

  return {
    namespacesRequired: [...mainLayoutNamespacesRequired]
  };
};

export default withToken({ ssr: true })(CareerPage);
