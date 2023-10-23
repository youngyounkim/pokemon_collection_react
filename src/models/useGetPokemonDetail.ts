// useQueres 사용해서 배열 받으면 배열 반복문 돌면서 가져온 데이터 매핑해서 디테일한 테이터로 전달하게 하자!
import { getApi } from 'lib/axios';
import { pokemonKey } from 'lib/queryKeyFactory';
import { useQuery } from 'react-query';
import { Pokemon } from 'pokenode-ts';
import { AxiosResponse } from 'axios';

const useGetPokemonDetail = (id: number | string = 0) => {
    const { data, isLoading } = useQuery<AxiosResponse<Pokemon>, Error, Pokemon>(pokemonKey.pokemonDetail(id), () =>
        getApi(`/pokemon/${id}`).then((data) => data.data)
    );

    return { data, isLoading };
};

export default useGetPokemonDetail;