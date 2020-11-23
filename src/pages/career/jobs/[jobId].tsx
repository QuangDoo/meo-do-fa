import React from 'react';

import Footer from '../../../components/Layout/Footer';
import Head from '../../../components/Layout/Head';
import Header from '../../../components/Layout/Header';
import Nav from '../../../components/Layout/Nav';
import Career from '../../../components/Modules/Career'

const job = {
  name: "Tax Accountant",
  department: "People, Legal and Finance",
  level: "Experienced",
  location: "Việt Nam - TP. Hồ Chí Minh",
  description: `Bộ phận Nhân lực, Pháp lý, Tài chính đóng vai trò thiết yếu tại Shopee. 
  Họ chịu trách nhiệm về nhu cầu nguồn nhân lực cho mọi phòng ban và hỗ trợ mọi thủ tục về hành chính, 
  pháp lý để vận hành doanh nghiệp. Vì yếu tố con người là trọng tâm phát triển của Shopee, 
  nên những bộ phận này đang không ngừng cải thiện và nâng cao khả năng hỗ trợ để đưa Shopee lên một 
  tầm cao hơn.`,
  jobDescription: [
    "Main in-charge for preparation of tax returns, including corporate Income Tax, Value Added Tax, Foreign Contractor Withholding Tax, and Transfer pricing documentation",
    `Assist line manager carry out tax projects to improve tax compliance, reduce tax risk and substance tax position`,
    `Timely provides supports on finance events as final statutory audit, tax audit or any other activities that not anticipated`,
    `Support on preparing tax corespondence and related documents to tax or related authorities in case seeking advices or appealing, where required`,
    `Review all kind of contract & relevant supporting documents from tax perspective to ensure compliance with both internal & external policies`,
    `Review all kind of promotion registration form and tracking the promotion compliance from tax perspective`,
    `Timely address tax concerns of other business team, where required`,
    `Keeps up to date with changing tax laws, analyses the implication and timely consult to management`,
    `Other tasks assigned by manager`,
  ],
  requirements: [
    `3+ years of experience in Big4 or other professional firm`,
    `In-house tax experience is a plus`,
    `Bachelor Degree majoring in Accounting, Finance, Economics, etc`,
    `Fluent in English writing and speaking`,
    `Eager-to-learn attitude and ability to work under pressure`,
  ]
}


const CareerPage = (): JSX.Element => {
  
  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <Career />
     
      <Footer />
    </>
  );
};

CareerPage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'header', 'footer', 'productCard', 'productBadge']
});

export default CareerPage;
