module.exports = () => {
  return `
    query {
			repository(name: "react-magma", owner: "cengage") {
				id
				forkCount
				issues {
					totalCount
				}
				stargazers {
					totalCount
				}
				collaborators(first: 100) {
					edges {
						node {
							id
							url
							avatarUrl
						}
					}
				}
				updatedAt
				releases(first: 100, orderBy: { field: CREATED_AT, direction: DESC }) {
					edges {
						node {
							id
							author {
								id
							}
							descriptionHTML
						}
					}
				}
			}
    }`;
};