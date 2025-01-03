import { api } from "../api";
import { propsUseFetch } from "../hooks/useFetch";

interface fetchApiProps {
  query: string
  variables?: object
  apiRoute: "ApiApp" | "ApiBodas"
  type: "json" | "formData";
}



export const fetchApi: (props: fetchApiProps) => Promise<any> = async ({ query, variables = {}, type = "json", apiRoute }) => {
  try {
    if (type === "json") {
      const {
        data: { data },
      } = await api[`${apiRoute}`]({ data: { query, variables } });
      return Object.values(data)[0];
    } else if (type === "formData") {
      const formData = new FormData();
      const values = Object?.entries(variables);

      // Generar el map del Form Data para las imagenes
      const map = values?.reduce((acc: any, item: any) => {
        if (item[1] instanceof File) {
          acc[item[0]] = [`variables.${item[0]}`];
        }
        if (item[1] instanceof Object) {
          Object.entries(item[1]).forEach((el) => {
            if (el[1] instanceof File) {
              acc[el[0]] = [`variables.${item[0]}.${el[0]}`];
            }
            if (el[1] instanceof Object) {
              Object.entries(el[1]).forEach((elemento) => {
                if (elemento[1] instanceof File) {
                  acc[elemento[0]] = [
                    `variables.${item[0]}.${el[0]}.${elemento[0]}`,
                  ];
                }
              });
            }
          });
        }
        return acc;
      }, {});

      // Agregar filas al FORM DATA

      formData.append("operations", JSON.stringify({ query, variables }));
      formData.append("map", JSON.stringify(map));
      values.forEach((item) => {
        if (item[1] instanceof File) {
          formData.append(item[0], item[1]);
        }
        if (item[1] instanceof Object) {
          Object.entries(item[1]).forEach((el) => {
            if (el[1] instanceof File) {
              formData.append(el[0], el[1]);
            }
            if (el[1] instanceof Object) {
              Object.entries(el[1]).forEach((elemento) => {
                if (elemento[1] instanceof File) {
                  formData.append(elemento[0], elemento[1]);
                }
              });
            }
          });
        }
      });

      const { data } = await api[`${apiRoute}`]({ data: formData });

      if (data.errors) {
        throw new Error(JSON.stringify(data.errors));
      }

      return Object.values(data.data)[0];
    }
  } catch (error) {
    console.log(error, apiRoute, query);
  }
};

export type Queries = {
  getExistUser: string;
  getContacts: string;
  getEventsGuess: string
  getSignInStatus: string
  updateNickName: string
  // revisar cuáles se usan de aquí en adelante
  signOut: string
  auth: string
  authStatus: string
  getChatIdForBusiness: string;
  getChats: string; //usado
  createUser: string;
  getOneChat: string;
  getUser: string;
  deleteImages: string;
  singleUpload: string;
  getEventsByID: string
  getUsers: string
};

export const queries: Queries = {
  getUsers: `query ($uids:[ID]){
    getUsers(uids:$uids){
      uid
      email
      displayName
      photoURL
      onLine{
        status
        dateConection
      }
    }
  }`,
  getEventsByID: `query ($variable: String, $valor: String, $development: String!) {
    queryenEvento( variable:$variable, valor:$valor, development:$development){
      _id
      development
      compartido_array
      detalles_compartidos_array{
        email
        uid
        permissions{
          title
          value
        }
        createdAt
        updatedAt
      }
      estatus
      nombre
      tipo
      usuario_id
      usuario_nombre
      fecha
      imgInvitacion{
        _id
        i1024
        i800
        i640
        i320
        createdAt
      }
      notificaciones_array{
        _id
        fecha_creacion
        fecha_lectura
        mensaje
      }
      itinerarios_array{
        _id
        title
        tasks{
          _id
          fecha
          hora
          icon
          descripcion
          responsable
          duracion
          tags
          tips
          estatus
          attachments{
            _id
            name
            url
            size
            createdAt
            updatedAt
          }
          spectatorView
          comments{
            _id
            comment
            uid
            createdAt
          }
          commentsViewers
        }
        viewers
        tipo
        estatus
      }
      _id
      invitados_array{
        _id
        nombre
        grupo_edad
        correo
        telefono
        chairs{
          planSpaceID
          sectionID
          tableID
          position
          order
        }
        father
        passesQuantity
        nombre_mesa
        puesto
        asistencia
        nombre_menu
        rol
        correo
        sexo
        movil
        poblacion
        pais
        direccion
        invitacion
        fecha_invitacion
      }
    }
  }`,
  getExistUser: `query($uid: String){
    getExistUser(uid:$uid)
  }`,
  getContacts: `query($uid: String){
    queryenInvitados(uid:$uid){
      total
      results{
        _id
        uid
        onLine{
          status
          dateConection
        }
        nickName
        photoURL
        correo
        eventos{
          _id
          nombre
        }
      }
    }
  }`,
  getEventsGuess: `query($uid: String){
    queryenEventoInvitadoConfirmado(uid:$uid){
      total
      results{
        _id
        nombre
      }
    }
  }`,
  getSignInStatus: `query($uid: ID){
    getSignInStatus(uid:$uid)
  }`,
  updateNickName: `mutation ($uid: String, $nickName:String){
    updateNickName(uid:$uid, nickName:$nickName)
  }`,
  // revisar cuáles se usan de aquí en adelante
  signOut: `mutation ($sessionCookie :String){
    signOut(sessionCookie:$sessionCookie)
  }`,
  auth: `mutation ($idToken : String){
    auth(idToken: $idToken){
      sessionCookie
    }
  }`,
  authStatus: `mutation ($sessionCookie : String){
    status(sessionCookie: $sessionCookie){
      customToken
    }
  }`,
  getChatIdForBusiness: `query ($businessID : ID){
    getChatIdForBusiness(_id: $businessID)
  }`,
  getChats: `query ($uid: [ID], $origin: String, $skip :Int!, $limit : Int!, $text : String) {
    getChats(uid :$uid, origin: $origin, skip: $skip, limit: $limit, include: $text){
      total
      results{
        _id
        title
        onLine{
          status
          dateConection
        }
        type
        addedes{
          userUid
          type
        }
        messages{
          type
          emitUserUid
          message
          fileUrl
          createdAt
          received
          read
          deletedEmit
          deletedReceiv
        }
        createdAt
        updatedAt
        photoURL
      }
    }
  }`,

  createUser: `mutation  ($uid : ID, $city: String, $country : String, $weddingDate : String, $phoneNumber : String, $role : [String]) {
    createUser(uid: $uid, city : $city, country : $country, weddingDate : $weddingDate, phoneNumber : $phoneNumber, role: $role){
          city
          country
          weddingDate
          phoneNumber
          role
        }
      }`,
  getOneChat: `query($IDChat :ID){
    getOneChat(_id: $IDChat){
      _id
      title
      onLine{
        status
        dateConection
      }
      type
      photoURL
      addedes{
        userUid
        type
      }
      messages{
        type
        emitUserUid
        message
        fileUrl
        createdAt
        received
        read
        deletedEmit
        deletedReceiv
      }
      createdAt
      updatedAt
    }
  }`,
  getUser: `query ($uid: ID) {
    getUser(uid:$uid){
      phoneNumber
      role
      typeRole
      city
      country
      weddingDate
      signUpProgress
      status
      createdAt
      updatedAt
    }
  }`,

  deleteImages: `mutation  ($idImage :ID, $idBusiness:ID, $use : String) {
    deleteUpload(_id:$idImage, businessID:$idBusiness, use:$use)
  }`,
  singleUpload: `mutation($file:Upload!,$use:String)
  {
    singleUpload(file:$file,use:$use){
      _id
      i640
    }
  }`,
};

export const GraphQL = {
  // getPhotosBusinessByID: async (variables: any) => {
  //   const query = `query getBusiness($_id : ID){
  //     getBussines(id:$_id){
  //         _id,
  //         photos{
  //           _id
  //           mediumUrl
  //         }
  //       }
  //   }
  //   `;
  //   const {
  //     data: {
  //       data: { getBussines },
  //     },
  //   } = await api.graphql({ query, variables });
  //   return getBussines;
  // },

  uploadImage: async (file: any, id: string, use: string, development: string) => {
    const newFile = new FormData();
    const params = {
      query: `mutation ($file: Upload!, $businessID : String, $use : String) {
                singleUpload(file: $file, businessID:$businessID, use : $use){
                  _id
                  i1024
                  i800
                  i640
                  i320
                  createdAt
                }
              }
            `,
      variables: {
        file: null,
        businessID: id,
        use: use,
      },
    };

    let map = {
      0: ["variables.file"],
    };

    newFile.append("operations", JSON.stringify(params));
    newFile.append("map", JSON.stringify(map));
    newFile.append("0", file);

    const config = {
      onUploadProgress: (progressEvent: ProgressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
      },
    };

    const {
      data: {
        data: { singleUpload },
      },
    } = await api.ApiBodas({ data: newFile });
    return singleUpload;
  },
};
