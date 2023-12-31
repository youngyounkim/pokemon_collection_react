import { useInfiniteQuery } from 'react-query';
import { pokemonKey } from 'lib/queryKeyFactory';
import { PokemonListResponse } from 'types/types';
import { getApi } from 'lib/axios';
import { PokemonListStateType } from 'lib/recoil/pokemonListState';
import { getId } from 'util/utilFn';

const useGetPokemonInfinityList = (pokemonList: PokemonListStateType[]) => {
    const { data, hasPreviousPage, fetchNextPage, isFetching, isFetchingNextPage, isError } = useInfiniteQuery<
        PokemonListResponse,
        Error,
        PokemonListResponse
    >(
        pokemonKey.pokemonListKey(),
        ({ pageParam = 0 }) => getApi(`/pokemon/?limit=30&offset=${pageParam}`).then((data) => data.data),
        {
            enabled: pokemonList.length !== 0,
            getNextPageParam: (lastPage) => {
                const { next }: any = lastPage;
                if (!next) return undefined;
                return Number(new URL(next).searchParams.get('offset'));
            },
            select: (data) => {
                return {
                    ...data,
                    pages: data.pages.map((el) => {
                        return {
                            ...el,
                            results: el.results.map((el) => {
                                const url = getId(el.url);
                                const nameData = pokemonList.find((item) => item.id === url);
                                return { ...el, krName: nameData?.name, id: nameData?.id };
                            })
                        };
                    })
                };
            }
        }
    );

    return { data, hasPreviousPage, fetchNextPage, isFetching, isFetchingNextPage, isError };
};

export default useGetPokemonInfinityList;
