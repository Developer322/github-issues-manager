import { GoComment } from 'react-icons/go';
import { gql, useMutation } from '@apollo/client';
import AddCommentModal from './addCommentModal';
import { useState } from 'react';
import { TRepoCardParams } from '../types/types';

const ADD_COMMENT = gql`
  mutation addComment($subjectId: ID!, $body: String!) {
    addComment(input:{ subjectId: $subjectId, body: $body}) {
      clientMutationId
    }
  }
`;

const RepoCard = ({ subjectId, title, text, commentsCount }: TRepoCardParams) => {

    const [mutateFunction, { data, loading, error }] = useMutation(ADD_COMMENT);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    
    return <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md m-4">
    <AddCommentModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} callback={ (input: string) => mutateFunction({ variables: { subjectId, body: input } })}/>
    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">{ title }</h5>

    <p className="mb-3 font-normal text-gray-500">{ text }</p>
    <div className='flex justify-between'>
        <span className="inline-flex items-center text-gray-600">
            Comments: { commentsCount }
        </span>
        <GoComment className='text-xl text-gray-900 hover:text-gray-600 cursor-pointer' onClick={() => setModalIsOpen(true)} />
    </div>
    
</div>
}

export default RepoCard;