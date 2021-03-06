import React from 'react';
import { Query } from 'react-apollo';
import RepositoryList from '../components/RepositoryList';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { GET_REPOSITORIES_OF_CURRENT_USER } from '../graphql/queries';

const ProfileContainer = () => {
    return (
        <Query query={GET_REPOSITORIES_OF_CURRENT_USER} notifyOnNetworkStatusChange={true}>
            {({ loading, error, data, fetchMore }) => {
                if (error) return <ErrorMessage error={error} />;
                if (loading && !data.viewer) return <Loading />;
                return (
                    <RepositoryList
                        repositories={data.viewer.repositories}
                        fetchMore={fetchMore}
                        loading={loading}
                        entry={'viewer'}
                    />
                );
            }}
        </Query>
    );
};

export default ProfileContainer;
