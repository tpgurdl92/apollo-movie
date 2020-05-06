import {gql} from "apollo-boost";


export const GETMOVIEDETAIL = gql`
    query getDetail($id: String!){
      getDetail(id: $id){
        movie{
          popularity
          video
          vote_count
          poster_path
          id
          adult
          backdrop_path
          original_language
          original_title
          genre_ids
          title
          vote_average
          overview
          release_date
          runtime
          genres{
            id
            name
          }
        }
        video{
          id
          key
          name
          site
          size
          type
        }
        compImageURL
        orgImageURL
      }
    }
`;

export const GETTVSHOWDETAIL = gql`
    query getTvshowDetail($id: String!){
      getTvshowDetail(id: $id){
        tvShow{
          id
          name
          vote_average
          original_name
          overview
          first_air_date
          poster_path
          backdrop_path
          original_language
          genres{
            id
            name
          }
          episode_run_time
          number_of_seasons
          seasons{
            air_date
            episode_count
            id
            name
            overview
            poster_path
            season_number
          }
        }
        video{
          id
          key
          name
          site
          size
          type
        }
        compImageURL
        orgImageURL
      }
    }
`;