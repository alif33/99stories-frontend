import Layout from '../layouts/client'
import Link from 'next/link'
import { BLANK_IMAGE, getData, IMAGE_URL } from '../helpers/HttpService'
import { capitalize, dateFormat, firstNWord, parseHtml } from '../helpers/Validator'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setTag } from './../redux/tag/actions';
import React, {useEffect} from 'react'
import { useRouter } from 'next/dist/client/router';

export default function Stories({ stories, randoms }) {
    const { tags } = useSelector(state => state)
    const dispatch = useDispatch()
    const router = useRouter()
    useEffect(() => {
        dispatch(setTag())
    }, [])
    return (
        <Layout>
            <section id="stories-part">
                <div className="row">
                    <div className="col-lg-12 col-sm-12 col-md-12">
                        <div className="title">
                            <h3><a href="#">Latest Stories</a></h3>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row stories-margin">
                        <div className="col-lg-8 col-sm-12 col-md-12">
                            {
                                stories.map(item => {
                                    return (
                                        <div className="stories-item">
                                            <div className="img">
                                                <Link href={`story/${item.slug}`}>
                                                    <a>
                                                        <img
                                                            src={item.story_image ? IMAGE_URL + item.story_image : BLANK_IMAGE}
                                                            alt={capitalize(item.name)}
                                                        />
                                                    </a>
                                                </Link>
                                            </div>
                                            <div className="details">
                                                <div className="person">
                                                    <span><i className="far fa-user-circle"></i>{capitalize(item.name)}</span>
                                                    <span><i className="far fa-calendar-alt"></i>{dateFormat(item.created_at)}</span>
                                                </div>
                                                <h2>
                                                    <Link href={`story/${item.slug}`}>
                                                        <a>{firstNWord(item.title, 8)}</a>
                                                    </Link>
                                                </h2>
                                                {parseHtml(firstNWord(item.details, 100))}
                                                <div className="button">
                                                    <Link href={`story/${item.slug}`}>
                                                        <a>Read More</a>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="col-lg-4 col-sm-12 col-md-12">
                            <div className="stories-right">

                                <form className="search">
                                    <h4>Search</h4>
                                    <div className="input">

                                        <input className="form-control me-2" type="search" placeholder="Type here" aria-label="Search" />
                                        <button className="btn" type="submit">Search</button>
                                    </div>
                                </form>

                                <div className="latest">
                                    <h4>Latest Story</h4>

                                    {
                                        randoms?.map(item => {
                                            return (
                                                <div className="latest-item">
                                                    <div className="img">
                                                        <Link href={`story/${item.slug}`}>
                                                            <a>
                                                                <img
                                                                    src={item.story_image ? IMAGE_URL + item.story_image : BLANK_IMAGE}
                                                                    alt={item.title}
                                                                />
                                                            </a>
                                                        </Link>
                                                    </div>
                                                    <div className="details">
                                                        <p>
                                                            <Link href={`story/${item.slug}`}>
                                                                <a>{firstNWord(item.title, 5)}</a>
                                                            </Link>
                                                        </p>
                                                        <div className="text">
                                                            <span>{capitalize(item.name)}</span>
                                                            <span className="text-secondary">{dateFormat(item.created_at)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                <div className="tag">
                                    <h4>Ralated Tags</h4>

                                    <ul>
                                        {tags.tagList?.map((tag, i) => <li>
                                                <button onClick={() => router.push({pathname: '/stories', query: tag.tag_slug})} className="m-1 btn btn-outline-primary" key={i}>{tag.tag_name}</button>
                                        </li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 col-sm-12">
                            <div className="story-list">
                                <ul>
                                    <li><a href="#">1</a></li>
                                    <li><a href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                    <li><a href="#"><i className="fas fa-chevron-right"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}


export async function getStaticProps() {
    const stories = await getData('/stories')
    const randoms = await getData('/stories/random')
    return {
        props: {
            stories,
            randoms
        }
    }
}
