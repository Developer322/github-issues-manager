import debounce from 'lodash.debounce';
import { useLazyQuery, gql } from '@apollo/client';
import { TReposRespone, TSearchBarParams } from '../types/types';
import { useState } from 'react';
import RepoCard from './repoCard';

const MainForm = () => {
  const GET_ISSUES = gql`
    query GET_ISSUES ($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        issues(last:20) {
          edges {
            node {
              id
              title
              bodyText
              comments{
                totalCount
              }
            }
          }
        }
      }
    }
  `;

  const [owner, setOwner] = useState<string>('');
  const [repo, setRepo] = useState<string>('');
  const [apikey, setApikey] = useState<string>(() => {
    const apikey = localStorage.getItem('apikey');
    return apikey ?? '';
  });

  const [getIssues, { client, error, data }] = useLazyQuery<TReposRespone>(GET_ISSUES);

  const debounedSearch = debounce(async (name: string, owner: string) => {
    if(owner !== '' && repo !== ''){
      getIssues({ variables: { name, owner } });
    }
  }, 1500);
  
  const onOwnerChange = (value: string): void => {
    setOwner(value);
    debounedSearch(repo, value);
  }

  const onRepoChange = (value: string): void => {
    setRepo(value);
    debounedSearch(value, owner);
  }

  const setApikeyDebounced = debounce(async (apikey: string) => {
    localStorage.setItem('apikey', apikey);
    client.cache.reset();
    debounedSearch(repo, owner);
  }, 1500);

  return (<div className='w-full flex flex-col justify-center items-center'>
      <SearchBar
        apikey={apikey}
        setApikeyDebounced={(value: string) => {
          setApikey(value);
          setApikeyDebounced(value);
        }}
        onOwnerChange={onOwnerChange}
        onRepoChange={onRepoChange}
        />
      {error === undefined ? <div className='mt-20 mx-10 flex flex-col w-full'>
          { data === undefined ? 
            <div className='text-center'>
              No data
            </div> :
            null}
          { data !== undefined ? data?.repository?.issues?.edges?.map( elem => <RepoCard
            subjectId={elem?.node?.id}
            title={elem?.node?.title}
            text={elem?.node?.bodyText}
            commentsCount={elem?.node?.comments?.totalCount}
            />
            ) : null }
      </div> : <div className='mt-20 text-center'>{error.message}</div>}
  </div>);
}

const SearchBar = ({ apikey, setApikeyDebounced, onOwnerChange, onRepoChange}: TSearchBarParams) => {

    return <div className='bg-white py-2 shadow-md fixed top-0 left-0 right-0 w-full flex justify-center items-center'>
        <input
            className="p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="github user"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onOwnerChange(e.target.value)}
            />
        <span className='mx-2 text-lg'>/</span>
        <input
            className="p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="github repo"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onRepoChange(e.target.value)}
            />
        <input
            className="ml-20 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="apikey"
            value={apikey}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setApikeyDebounced(e.target.value)}
            />
    </div>
}

export default MainForm;