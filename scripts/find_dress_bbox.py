"""
find_dress_bbox.py — Find the bounding box of non-transparent pixels
in each dress PNG. This tells us where the actual dress artwork sits
within the 325x742 frame, so we can apply the right transform to
make it align with the body.
"""

from PIL import Image

dresses = [
    ('dress2.png', 'Green A-Line'),
    ('dress3.png', 'Blue Puff'),
    ('dress4.png', 'Cream Floral'),
    # Also check dress1 and dress5 for comparison
    ('dress1.png', 'Tie-Dye'),
    ('dress5.png', 'White Buttoned'),
]

print(f"{'File':<15} {'Name':<18} {'BBox (x0,y0,x1,y1)':<25} {'Size (w×h)':<15} {'Center (x,y)'}")
print('-' * 90)

for filename, name in dresses:
    path = f'/home/z/my-project/public/{filename}'
    img = Image.open(path).convert('RGBA')
    w, h = img.size

    # Find bounding box of non-transparent pixels
    bbox = img.getbbox()  # Returns (left, top, right, bottom) of non-zero alpha
    if bbox:
        x0, y0, x1, y1 = bbox
        bw = x1 - x0
        bh = y1 - y0
        cx = (x0 + x1) / 2
        cy = (y0 + y1) / 2
        print(f'{filename:<15} {name:<18} ({x0},{y0},{x1},{y1}){"":<10} {bw}×{bh}{"":<6} ({cx:.0f},{cy:.0f})')
    else:
        print(f'{filename:<15} {name:<18} (fully transparent)')

print()
print('Body reference: the body image is 325×742 and fills the entire frame.')
print('  Body head: top ~y=25, chin ~y=110')
print('  Body shoulders: y=135, X 85–239')
print('  Body waist: y=240')
print('  Body hip: y=335')
print('  Body knee: y=540')
print('  Body feet: y=730')
