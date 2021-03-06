import React, { useState } from 'react';
import { Query } from 'react-apollo';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import IssueList from '../components/IssueList';
import IssueFilter from '../components/IssueFilter';

import { GET_ISSUES_OF_REPOSITORY } from '../graphql/queries';
import { NONE } from '../constants/constants';

const Issues = ({ repositoryOwner, repositoryName }) => {
    const [issueState, setIssueState] = useState(NONE);

    const isShow = (issueState) => issueState !== NONE;

    const onChangeIssueState = (nextIssueState) => {
        setIssueState(nextIssueState);
    };
    return (
        <div className="issues">
            <IssueFilter
                issueState={issueState}
                onChangeIssueState={onChangeIssueState}
                repositoryName={repositoryName}
                repositoryOwner={repositoryOwner}
            />

            {isShow(issueState) && (
                <Query
                    query={GET_ISSUES_OF_REPOSITORY}
                    variables={{ repositoryOwner, repositoryName, issueState }}
                >
                    {({ data, loading, error, fetchMore }) => {
                        if (error) return <ErrorMessage error={error} />;
                        const { repository } = data;

                        if (loading && !repository) {
                            return <Loading />;
                        }

                        if (!repository.issues.edges.length) {
                            return <div className="issues__empty">No Issues...</div>;
                        }
                        return (
                            <IssueList
                                issues={repository.issues}
                                fetchMore={fetchMore}
                                loading={loading}
                            />
                        );
                    }}
                </Query>
            )}
        </div>
    );
};

export default Issues;
