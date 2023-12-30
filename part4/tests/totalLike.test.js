const listHelper = require('../utils/list_helper')

test('0 blogs => 0 likes', () => {
  const blogs = []
  const result = listHelper.totalLikes(blogs)
  expect(result).toBe(0)
})

test('a few blogs => some likes', () => {
    const blogs = [
        {
            "title": "My First Blog",
            "author": "Me",
            "url": "http://astonishingblog.om",
            "likes": 2222,
            "id": "65903f2b86459a4670b074ca"
        },
        {
            "title": "My First Blog",
            "author": "Me",
            "url": "http://astonishingblog.om",
            "likes": 2222,
            "id": "65903f2b86459a4670b074ca"
        },
        {
            "title": "My First Blog",
            "author": "Me",
            "url": "http://astonishingblog.om",
            "likes": 2222,
            "id": "65903f2b86459a4670b074ca"
        },
        {
            "title": "My First Blog",
            "author": "Me",
            "url": "http://astonishingblog.om",
            "likes": 2222,
            "id": "65903f2b86459a4670b074ca"
        }

    ]
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(8888)
  })