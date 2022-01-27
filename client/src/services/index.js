export const getAllContentfulData = async () => {
  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/environments/casa-budget`;
  const query = `{
    shopCollection {
      items {
        sys {
          id
        }
        name
        logo {
          url
        }
      }
    }
    roomsCollection {
      items {
        sys {
          id
        }
        name
      }
    }
    categoryCollection {
      items {
        sys {
          id
        }
        name
      }
    }
    workerCollection {
      items {
        sys {
          id
        }
        name
      }
    }
    companyCollection {
      items {
        sys {
          id
        }
        name
      }
    }
  }`;

  const fetchOptions = {
    spaceID: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
    accessToken: process.env.REACT_APP_CONTENTFUL_CDA_ACCESS_TOKEN,
    endpoint,
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_CDA_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  const response = await fetch(endpoint, fetchOptions);
  const jsonData = await response.json();
  return parseContentfulItems(jsonData.data);
};

const parseContentfulItems = (data) => {
  let content = {
    shops: data.shopCollection.items.map((shop) => ({
      id: shop.sys.id,
      name: shop.name,
      image: shop.logo.url,
    })),
    rooms: data.roomsCollection.items.map((room) => ({
      id: room.sys.id,
      name: room.name,
    })),
    categories: data.categoryCollection.items.map((category) => ({
      id: category.sys.id,
      name: category.name,
    })),
    workers: data.workerCollection.items.map((worker) => ({
      id: worker.sys.id,
      name: worker.name,
    })),
    companies: data.companyCollection.items.map((company) => ({
      id: company.sys.id,
      name: company.name,
    })),
  };
  return content;
};
