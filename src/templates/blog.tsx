import React from 'react';
import { graphql } from 'gatsby';
import Fade from 'react-reveal/Fade';
import styled from 'styled-components';
import BlogList from '../components/BlogList';
import Layout from '../components/Layout';
import { Link } from '../components/Link';
import { PaddedPageWrapper } from '../components/Common';
import { Title } from '../components/Typography';
import { media } from '../styles/common';
import { Post } from '../types/Post';
import Newsletter from '../components/Newsletter';

const StyledTitle = styled(Title)`
    margin-bottom: 100px;

    ${media.medium`
        margin-bottom: 60px;
    `};
`;

const Pagination = styled.ul`
    display: flex;
    padding: 0;
`;

const PaginationItem = styled.li<{ position: string }>`
    margin-left: ${props => (props.position === 'right' ? 'auto' : 0)};

    &:before {
        display: none;
    }
`;

const PaginationLink = styled(Link)``;

const NewsletterWrapper = styled.div`
    margin-top: 40px;
`;

type BlogProps = {
    data: {
        allMdx: {
            edges: Post[];
        };
    };
    pageContext: {
        pagination: {
            page: string[];
            nextPagePath: string;
            previousPagePath: string;
        };
    };
};

const Blog = ({ data: { allMdx }, pageContext: { pagination } }: BlogProps) => {
    const { page, nextPagePath, previousPagePath } = pagination;

    const posts = page.map(id => allMdx.edges.find(post => post.node.id === id));

    return (
        <Layout title="Robert Cooper | Blog">
            <PaddedPageWrapper>
                <Fade top>
                    <StyledTitle>Blog</StyledTitle>
                </Fade>
                <BlogList posts={posts} />
                <Pagination>
                    {nextPagePath && (
                        <PaginationItem position="left">
                            <PaginationLink to={nextPagePath}>Newer Posts</PaginationLink>
                        </PaginationItem>
                    )}

                    {previousPagePath && (
                        <PaginationItem position="right">
                            <PaginationLink to={previousPagePath}>Older Posts</PaginationLink>
                        </PaginationItem>
                    )}
                </Pagination>
                <NewsletterWrapper>
                    <Newsletter />
                </NewsletterWrapper>
            </PaddedPageWrapper>
        </Layout>
    );
};

export default Blog;

export const pageQuery = graphql`
    query {
        allMdx {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        description
                        formattedDate: date(formatString: "MMMM DD, YYYY")
                        dateTimeString: date(formatString: "YYYY-MM-DD")
                        slug
                        categories
                    }
                    timeToRead
                }
            }
        }
    }
`;
