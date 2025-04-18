import News from "~/components/News";

function DiceGlowFeature() {
  const articles = [
    {
      desc: `
                <p>Đã chơi là phải chơi hết mình, dù chỉ là trò chơi đơn giản nhất! Chúng tôi sẽ giúp bạn có được những phút giây thú vị nhất với cục xúc xắc dạ quang với đèn LED 7 sắc cầu vồng đơn giản mà độc đáo này. Cùng Vài Thứ Hay tìm hiểu ngay nhé!</p>
                <iframe src="https://www.youtube.com/embed/Wif6h2WqkTw" width="100%" height="500px" title="Video giới thiệu robot hút bụi lau nhà Narwal"></iframe>
                <h2>Xúc xắc dạ quang là gì?</h2>
                <p>Không còn nhàm chán với cục xúc xắc thông thường nữa. Xúc xắc dạ quang được trang bị đèn LED ở cả 6 mặt, với chất liệu aluminum cực kỳ bền đảm bảo sẽ mang đến những phút giây thư giãn hết sức thú vị cho mọi người.</p>
                <img src="https://c1.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_limit,w_620/v1453453330/gc8zdzmvncigyyg9panw.jpg" 
                style="width: 100%; width: 100%;height: auto; margin: 10px 0;" />
                <p><strong>Các màu xúc xắc:</strong>Đen, Đen nút bạc (Black Silver), Bạc nút đen (Silver Black), Vàng Gold, Xám bạc (Space Grey), Xanh thẫm (Midnight Blue), Xanh dương (Light Blue), Xanh lá, Tím, Cam, Đồng, Hồng nút vàng (Rose Gold), Vàng nhạt & Đỏ tía (Blood Red). </p>
                <img src="https://c1.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_limit,w_620/v1453454916/tjfnm8whysstl47q6qxq.jpg" 
                style="width: 100%; width: 100%;height: auto; margin: 10px 0;" />
                <h2>Đặc điểm của Xúc xắc dạ quang đèn LED</h2>
                <p>Đèn LED RGB – Mỗi cục xúc xắc gồm 21 đèn RGB, mỗi mặt là một màu khác nhau: mặt 6 là màu xanh dương, mặt 5 màu xanh  lá, mặt 4 màu đỏ, mặt 3 màu vàng, mặt 2 màu hồng tía vàng mặt 1 màu xanh biển.</p>
                <p>Cảm ứng phát hiện chuyển động – Xúc xắc dạ quang có khả năng biết được môiz khi bạn cầm nó lên, nó sẽ tự động bật đèn LED. Sau 20s đứng yên không được sử dụng nữa, nó sẽ tự tắt đèn để tiết kiệm pin. Điều này là do xúc xắc được trang bị một gia tốc kế có thể cảm nhận được các chuyển động. Đây là điểm khiến chúng tôi rất tự hào nên mong là các bạn cũng sẽ thích nó!</p>
                <p>Pin thay thế được – Pin của xúc xắc hoàn toàn có thể thay bình thường nhé! Chỉ cần tháo mặt trên ra và thay pin thôi, pin của xúc xắc là pin “SR54” và bạn có thể mua ở bất cứ siêu thị nào trên toàn quốc.</p>
                <img src="https://i.imgur.com/CW8WZ23.gif" 
                style="width: 100%; width: 100%;height: auto; margin: 10px 0;" />
                <p>Làm bằng aluminum – Xúc xắc dạ quang được làm từ Aluminum 6061 chất lượng cao, đục khắc từ một khối nguyên nên rất cứng, bền và rất khó bị trầy, mẻ hay đập phá. Dù vậy nhưng khối lượng của nó vẫn rất nhẹ, chỉ khoảng 9,5gr thôi à!</p>
                <p>Cân bằng tốt – Xúc xắc dạ quang được phân bổ trọng lượng đều ở các mặt nên việc chơi thả xúc xắc trở nên công bằng hơn, không bị nghiêng hay lệch. Chất – Chỉ với một cục xúc xắc cũng có thể khẳng định được phong cách của bạn!</p>
                <p>Trên đây là những đặc điểm của cục xúc xắc dạ quang đèn LED siêu ngầu độc đáo. Hãy sở hữu ngay em nó bằng cách truy cập liên hệ <a href="">Vài Thứ Hay</a> để đặt mua nhé! Theo dõi chúng tôi để xem sớm nhất sản phẩm công nghệ độc đáo!</p>
            `,
    },
  ];
  return (
    <>
      <News
        title="Lộ diện xúc xắc dạ quang đèn LED chất nhất quả đất"
        articles={articles}
      />
    </>
  );
}

export default DiceGlowFeature;
