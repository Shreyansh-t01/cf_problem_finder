import React from 'react'

const MainPage = () => {
  return (
    <div className="container flex flex-col">
        <div className="serchBar">
            <button>search</button>
            <input type="text" />
        </div>
        <div className="mainData">
            <h2>Username</h2>
            <div className="problemSolved">
                <h4>problems Solved:-</h4>
                <h4>60</h4>
            </div>
            <div className="rating">
                <h4>rating:-</h4>
                <h4>1200</h4>
            </div>
            <div className="maxRating">
                <h4>maxrating:-</h4>
                <h4>1400</h4>
            </div>
            <div className="acceptanceRate">
                <h4>acceptance rating:-</h4>
                <h4>30%</h4>
            </div>
            <div className="ratingwiseSolved">
                <table>
                    <tr>
                        <th>rating</th>
                        <th>solved problems</th>
                    </tr>
                    <tr>
                        <td>1000</td>
                        <td>30</td>
                    </tr>
                    <tr>
                        <td>1200</td>
                        <td>12</td>
                    </tr>
                </table>
            </div>
            <div className="tagWiseSolved">
                <table>
                    <tr>
                        <th>Question Tag</th>
                        <th>Problems Solved</th>
                    </tr>
                    <tr>
                        <td>brute force</td>
                        <td>20</td>
                    </tr>
                    <tr>
                        <td>binary search</td>
                        <td>12</td>
                    </tr>
                    <tr>
                        <td>dynammic programming</td>
                        <td>13</td>
                    </tr>
                </table>
            </div>
            <div className="aiResponse">
                <div className="analysis">
                    <h3>Analysis:-</h3>
                    <div className="points">
                        1. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus consequatur, iusto molestiae veritatis aliquid ipsum.
                    </div>
                    <div className="points">
                        2. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus consequatur, iusto molestiae veritatis aliquid ipsum.
                    </div>
                    <div className="points">
                        3. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus consequatur, iusto molestiae veritatis aliquid ipsum.
                    </div>
                    <div className="points">
                        4. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus consequatur, iusto molestiae veritatis aliquid ipsum.
                    </div>
                </div>
                <div className="mistakes">
                    <h3>Mistakes:-</h3>
                    <div className="points">
                        1. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus consequatur, iusto molestiae veritatis aliquid ipsum.
                    </div>
                    <div className="points">
                        2. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus consequatur, iusto molestiae veritatis aliquid ipsum.
                    </div>
                    <div className="points">
                        3. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus consequatur, iusto molestiae veritatis aliquid ipsum.
                    </div>
                </div>
                <div className="tipsToImprove">
                    <h3>Tips To Improve:-</h3>
                    <div className="points">
                        1. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus consequatur, iusto molestiae veritatis aliquid ipsum.
                    </div>
                    <div className="points">
                        2. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus consequatur, iusto molestiae veritatis aliquid ipsum.
                    </div>
                    <div className="points">
                        3. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus consequatur, iusto molestiae veritatis aliquid ipsum.
                    </div>
                    <div className="points">
                        4. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus consequatur, iusto molestiae veritatis aliquid ipsum.
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default MainPage