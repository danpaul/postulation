import BaseComponent from '../lib/baseComponent';
import React from 'react';

const IMAGE_STYLE = {width: '100%'}

module.exports = BaseComponent.createClass({
    render: function(){
       return <div style={{paddingTop: 20}}>
            <h3>About</h3>
            <p>
                Postulation is an argument application. Arguments (called paths) are constructed out of links and nodes. A path is just a series of linked nodes leading to a conclusion.
            </p>
            <p>
                Path’s nodes and links can be supported or negated by constructing new paths and linking them to the relevant node or link. These response paths can themselves be supported or negated ad infinitum.
            </p>
            <p>
                The strength of the paths and nodes is socially determined. If a path receives a higher proportion of upvotes it will have a higher ranking and appear above paths with a higher proportion of downvotes.
            </p>

            <h3>Motivation</h3>
            <p>
                The primary motivation for the application is to improve online argumentation. Traditional comment sections fall short for a number of reasons. Their linear natures can lead to repetition, their lack of structure can lead to “ships passing in the night” type of arguments that fail to really engage, the looseness can lead to several parallel arguments happening in the same thread leading lack of clarity of the underlying ideas.
            </p>
            <p>
                It is also hoped that the application provides the means to provide argument mapping, to be able to analyze, dissect and trace back arguments premises to their fundamental foundations.
            </p>

            <h3>Getting Started</h3>

            <p>You can get started by clicking the title in the upper left corner to navigate to the home view. You will be able to browse new and trending paths. To participate in the community by creating your own paths, responses and to vote, you’ll need to register.</p>

            <h4>Creating a New Path</h4>
            <p>Click on the "create new path" option in the menu:</p>
            <img style={IMAGE_STYLE} src="/img/docs/create_path.png" />
            <p>Fill out the new path form:</p>
            <img style={IMAGE_STYLE} src="/img/docs/create_path_form.png" />
            <p>After creating the path, you'll be taken to a detail view of the path you just created.</p>

            <h4>Reply to an Existing Path</h4>
            <p>In the path detail view, click on the reply tab on the right. Then, add a title and nodes.</p>
            <img style={IMAGE_STYLE} src="/img/docs/path_reply_affirm.png" />
            <p>After creating, you should see your path in the response section of the path you responded to.</p>
            <img style={IMAGE_STYLE} src="/img/docs/path_response_read.png" />

       </div>
    }
});