
 const formatLink= (link) => {
    if(link[1]==='/') {
        link=link.substring(1)
    }
    return link
 }
module.exports = {
  formatLink
}