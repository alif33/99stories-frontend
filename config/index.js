export const userSidebar = [
    {
        link: "/dashboard",
        icon: "fas fa-tachometer-alt",
        name: "Dashboard"
    },
    {
      link: "/dashboard/contests",
      icon: "fas fa-trophy",
      name: "Contest"
    },
    {
        link: "/dashboard/stories",
        icon: "fas fa-book",
        name: "Story"
    },
    {
        link: "/dashboard/bookmarks",
        icon: "fas fa-bookmark",
        name: "Bookmark"
    },
    {
        link: "/dashboard/profile",
        icon: "fas fa-user-alt",
        name: "Profile"
    }
]

export const adminSidebar = [
    {
        link: "/admin/dashboard/category",
        icon: "fas fa-list-alt",
        name: "Category"
    },
    {
      link: "/admin/dashboard/stories",
      icon: "fas fa-book",
      name: "Story"
    },
    {
        link: "/admin/dashboard/contests",
        icon: "fas fa-trophy",
        name: "Contest"
    }
]


export const settings = {

    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
}
