import { useState, useEffect } from 'react';
import './draft.scss';



export default function Draft(){
	// console.log('Draft');

	const [ count, setCount ] = useState( 1 );

	useEffect(()=>{

		window.onmessage = (e)=>{
			console.log( '我是react,我接受到了来自iframe的数据：', e, e.data );
		}

		return ()=>{

			window.onmessage = null;
		}
	}, []);


	return (
		<div className="draft"

			onScroll={( e )=>{
				// console.log('e:', e);
				// console.log('e.currentTarget:', e.currentTarget);

				// const iframeDom = e.currentTarget.childNodes[1];

				// console.log('iframeDom:', iframeDom);
				// if(
				// 	iframeDom.getBoundingClientRect().top < window.innerHeight &&
				// 	!hasPost
				// ){

				// 	setHasPost( ()=>{
				// 		iframeDom.contentWindow.postMessage("父页面向子页面发送消息", "*");
				// 		return true;
				// 	} );
				// }

				if( count > 0 ){
					console.log('count:', count);

					setCount( count + 1 );
				}
			}}>
			<div className="proscenium">
				proscenium { count }
			</div>

			<iframe
				key="draftIframe"
				title="draftIframe"
				className="iframe"
				src="http://localhost:7999/learn_code_demo/css/z_index.html"

				ref={( iframe )=>{

					if(
							iframe &&
							iframe.getBoundingClientRect().top < window.innerHeight &&
							count > 0
						){

						console.log('执行');
						console.log('count:', count);

						setCount( ()=>{
							iframe.contentWindow.postMessage("父页面向子页面发送消息", "*");
							return -1;
						} );

						setCount( 0 );
					}
				} }
			/>
		</div>
	)
}